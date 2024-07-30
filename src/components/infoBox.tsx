import React from 'react';
import { Tooltip } from 'react-tooltip'; // Make sure to install this package or use the correct import
import { CiCircleInfo } from 'react-icons/ci'; // Make sure to install react-icons package

import { FaRegCopy } from "react-icons/fa6";

import toast, { Toaster } from 'react-hot-toast';


interface InfoBoxProps {
    label: string;
    value: any;
    bgColor?: string;
    toolTipText?: string;
}

const RenderInfoBox: React.FC<InfoBoxProps> = ({ label, value, bgColor = 'bg-blue-50', toolTipText }) => {
    // Check if tooltip text is provided
    const showTooltip = toolTipText && toolTipText.trim() !== '';

    const handleCopy = () => {
        const textToCopy = `${label}: ${value}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast.success("Successfully copied", { position: "bottom-center" });
        }).catch(err => {
            console.error('Failed to copy: ', err, { position: "bottom-center" });
            toast.error('Failed to copy');
        });
    };

    return (
        <>
            <Toaster/>

            <span className="font-bold text-black flex items-center space-x-1">
                <FaRegCopy onClick={handleCopy} className="cursor-pointer" />
                {label}:
            </span>
            <div className={`${bgColor} p-2 mb-2 rounded-md border border-blue-200 items-center space-x-2 break-words relative flex min-h-[45px]`}>
                <span className="text-black whitespace-pre-wrap">{value}</span>
                {showTooltip && (
                    <div className="relative">
                        {/* Tooltip Icon */}
                        <span
                            className="text-black cursor-pointer"
                            data-tooltip-id="info-tooltip" // Set the tooltip ID
                            data-tooltip-content={toolTipText} // Set the tooltip content
                        >
                            <CiCircleInfo />
                        </span>
                        {/* Tooltip Component */}
                        <Tooltip
                            id="info-tooltip" // Match this ID with the data-tooltip-id
                            place="top" // Position of the tooltip
                            className="text-sm px-4 py-2" // Custom className for styling
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default RenderInfoBox;
