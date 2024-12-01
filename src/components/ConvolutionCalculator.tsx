'use client';

import React, { useState } from 'react';

export default function ConvolutionCalculator() {
    // State for input parameters
    const [inputParams, setInputParams] = useState({
        inputHeight: '',
        inputWidth: '',
        kernelSize: '',
        stride: '1',
        padding: '0'
    });

    // State for calculation result
    const [result, setResult] = useState({
        outputHeight: null,
        outputWidth: null
    });

    // Handle input changes
    // @ts-ignore
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate convolution output size
    const calculateConvolutionOutputSize = () => {
        const {
            inputHeight, inputWidth,
            kernelSize,
            stride,
            padding
        } = inputParams;

        // Validate inputs
        const isValidInput = [
            inputHeight, inputWidth,
            kernelSize,
            stride,
            padding
        ].every(val => val !== '' && !isNaN(Number(val)));

        if (!isValidInput) {
            alert('Please enter valid numbers for all fields');
            return;
        }

        // Convert to numbers
        const iH = Number(inputHeight);
        const iW = Number(inputWidth);
        const kS = Number(kernelSize);
        const s = Number(stride);
        const p = Number(padding);

        // Output size calculation formula
        const outHeight = Math.floor((iH + 2 * p - kS) / s) + 1;
        const outWidth = Math.floor((iW + 2 * p - kS) / s) + 1;

        setResult({
            // @ts-ignore
            outputHeight: outHeight,
            // @ts-ignore
            outputWidth: outWidth
        });
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">
                        CNN Convolution Output Size Calculator
                    </h1>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Input Dimensions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Input Height
                            </label>
                            <input
                                type="number"
                                name="inputHeight"
                                value={inputParams.inputHeight}
                                onChange={handleInputChange}
                                placeholder="Enter input height"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Input Width
                            </label>
                            <input
                                type="number"
                                name="inputWidth"
                                value={inputParams.inputWidth}
                                onChange={handleInputChange}
                                placeholder="Enter input width"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Kernel Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kernel Size
                            </label>
                            <input
                                type="number"
                                name="kernelSize"
                                value={inputParams.kernelSize}
                                onChange={handleInputChange}
                                placeholder="Enter kernel size"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Stride */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stride
                            </label>
                            <input
                                type="number"
                                name="stride"
                                value={inputParams.stride}
                                onChange={handleInputChange}
                                placeholder="Enter stride"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Padding */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Padding
                            </label>
                            <input
                                type="number"
                                name="padding"
                                value={inputParams.padding}
                                onChange={handleInputChange}
                                placeholder="Enter padding"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={calculateConvolutionOutputSize}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Calculate Output Size
                    </button>

                    {/* Results Display */}
                    {result.outputHeight !== null && result.outputWidth !== null && (
                        <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-md">
                            <h3 className="text-lg font-bold mb-2 text-green-800">Output Dimensions</h3>
                            <p className="text-green-700">Output Height: {result.outputHeight}</p>
                            <p className="text-green-700">Output Width: {result.outputWidth}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}