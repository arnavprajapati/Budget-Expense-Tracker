import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, FileText, Loader2, XCircle } from 'lucide-react';
import { uploadStatementAndParse, clearParsedTransactions } from '../store/slice/budgetSlice';

function StatementUpload() {
    const dispatch = useDispatch();
    const { parsingStatus, parsingError } = useSelector(state => state.budgets);

    const [selectedFile, setSelectedFile] = useState(null);

    const isUploading = parsingStatus === 'loading';

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            dispatch(clearParsedTransactions());
        } else {
            alert("Please select a valid PDF file.");
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            dispatch(uploadStatementAndParse(selectedFile));
        }
    };

    const handleClearError = () => {
        dispatch(clearParsedTransactions());
        setSelectedFile(null);
    }

    return (
        <div className="bg-white border-2 border-dashed border-[#387ED1] rounded-xl p-6 mb-12 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#387ED1] font-semibold" />
                <span className="font-semibold">Upload Bank Statement (PDF) for Analysis</span>
            </h3>

            {parsingStatus === 'failed' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm flex justify-between items-center font-semibold">
                    <span>Error: {parsingError}</span>
                    <button onClick={handleClearError} className="text-red-700 hover:text-red-900 font-semibold">
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 font-semibold
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#387ED1] file:text-white
                        hover:file:bg-blue-600
                        transition duration-200 cursor-pointer"
                disabled={isUploading}
            />

            {selectedFile && (
                <p className="mt-3 text-sm text-gray-600 font-semibold">
                    File selected: {selectedFile.name}
                </p>
            )}

            <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-[#387ED1] hover:bg-blue-600 transition duration-200 flex items-center space-x-2 disabled:bg-gray-400 cursor-pointer"
            >
                {isUploading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin font-semibold" />
                        <span className="font-semibold">Analyzing Statement...</span>
                    </>
                ) : (
                    <>
                        <Upload className="w-5 h-5 font-semibold" />
                        <span className="font-semibold">Upload & Analyze</span>
                    </>
                )}
            </button>
        </div>
    );
}

export default StatementUpload;