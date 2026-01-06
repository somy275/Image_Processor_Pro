/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Workflow_Status = ({ status, progress, Downloading }) => {
    const{tab_status}=useSelector(res=>res?.Tab)
    const [workflow, setWorkflow] = useState([])
        const Converting_Workflow = [
        { label: "Uploading", key: "Uploading", threshold: 0 },
        { label: "Processing", key: "Processing", threshold: 40 },
        { label: "Converting", key: "Converting", threshold: 80 },
        { label: "Completed", key: "Completed", threshold: 100 },
        { label: "Downloading", key: "Downloading", threshold: 100 },
    ];
//---------------Converting Image Workflow ----------------------
     const Watermark_Workflow=[
            ...Converting_Workflow.slice(0,2),
            { label: "Adding Watermark", key: "Adding Watermark", threshold: 80 },
            ...Converting_Workflow.slice(3,5)
        
    ]
      const Resize_Workflow=[
            ...Converting_Workflow.slice(0,2),
            { label: "Resizing", key: "Resizing", threshold: 80 },
            ...Converting_Workflow.slice(3,5)  
    ]

    const Pdf_Workflow=[
          ...Converting_Workflow.slice(0,2),
            { label: "Creating PDF", key: "Creating PDF", threshold: 80 },
            ...Converting_Workflow.slice(3,5)  
    ]
     const Compress_Workflow=[
          ...Converting_Workflow.slice(0,2),
            { label: "Compressing", key: "Compressing", threshold: 80 },
            ...Converting_Workflow.slice(3,5)  
    ]
    useEffect(()=>{
        console.log(tab_status)
if(tab_status==="Convert"){
    setWorkflow(Converting_Workflow)
}
else if(tab_status==='WaterMark'){
    setWorkflow(Watermark_Workflow)
}
else if(tab_status==='Resize'){
    setWorkflow(Resize_Workflow)
}
else if(tab_status==='Pdf'){
    setWorkflow(Pdf_Workflow)
}
else{
    setWorkflow(Compress_Workflow)
}
return ()=> setWorkflow([])
    },[tab_status])
    
   
   


    return (
        <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">
                Workflow Status
            </h3>

            <div className="space-y-3">
                {workflow.map((step) => {
                    const isActive = status === step.key && status != "Completed";
                    const isPast =
                        progress > step.threshold ||
                        (progress === 100 && step.key === "Completed") ||
                        Downloading;
                    return (
                        <div key={step.key} className="flex items-center gap-3">
                            <div
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${isPast
                                        ? "bg-emerald-500"
                                        : isActive
                                            ? "bg-blue-600 animate-pulse"
                                            : "bg-slate-300"
                                    }`}
                            />

                            <span
                                className={`text-sm ${isPast || isActive
                                        ? "text-slate-800 font-medium"
                                        : "text-slate-400"
                                    }`}
                            >
                                {step.label}
                            </span>

                            {/* Right side labels */}
                            {isActive && (
                                <span className="ml-auto text-xs text-blue-600 font-semibold">
                                    In Progress
                                </span>
                            )}
                            {isPast && !isActive && (
                                <span className="ml-auto text-xs text-emerald-600 font-semibold">
                                    ✓
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Workflow_Status;
