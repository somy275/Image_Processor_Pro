import { useSelector } from "react-redux";
import { useProgress } from "../hooks/useProgress";
import { MdDownloadDone } from "react-icons/md";
import Workflow_Status from "./Workflow_Status";
import { useState } from "react";
import { useEffect } from "react";
const Processing_Percentage = () => {
  const { status, progress } = useProgress();  //get the real-time status and progress
  // const{tab_status}=useSelector(res=>res?.Tab)
  const { Downloading:Convert_Download } = useSelector((res) => res?.Convert);
  const {Downloading:Watermark_Download}=useSelector(res=>res?.WaterMark)
  const{Downloading:Resize_Download}=useSelector(res=>res?.Resize)
  const{Downloading:Pdf_Download}=useSelector(res=>res?.Pdf)
   const{Downloading:Compress_Download}=useSelector(res=>res?.Compress)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
const [Downloading, setDownloading] = useState(false)


useEffect(()=>{
  if(Convert_Download || Watermark_Download || Resize_Download || Pdf_Download || Compress_Download){
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDownloading(true)
  }
},[Convert_Download,Watermark_Download,Resize_Download,Pdf_Download,Compress_Download])
  const getStatusColor = () => {
    switch (status) {
      case "Uploading":
        return "#4F46E5"; // Indigo
      case "Processing":
        return "#0EA5E9"; // Sky blue
      case "Converting":
        case "Creating PDF":
          case "Resizing":
            case "Adding Watermark":
              case "Compressing":
        return "#8B5CF6"; // Purple
      case "Completed":
        return "#10B981"; // Green
      default:
        return "#64748B";
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
        {/* ---------- Circular Progress ---------- */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={getStatusColor()}
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-slate-800">
              {Downloading ? (
                <MdDownloadDone className="text-[#10B981] h-12 w-12" />
              ) : (
                Math.round(progress) + "%"
              )}
            </span>
          </div>
        </div>

        {/* ---------- Status Badge ---------- */}
        <div className="flex justify-center mb-8">
          <div
            className="px-6 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
            style={{ backgroundColor: getStatusColor() }}
          >
            {Downloading ? "Downloaded" : `${status}`}
          </div>
        </div>

        {/* ---------- Workflow Milestones ---------- */}
        <Workflow_Status
          status={status}
          progress={progress}
          Downloading={Downloading}
        />
      </div>

      {Downloading && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="cursor-pointer hover:bg-[#6a75f0fc] absolute top-[5%] left-[4%] bg-[#7C86FF] py-1.5 px-6 text-white font-sm font-semibold rounded-4xl"
        >
          Back
        </button>
      )}
    </section>
  );
};

export default Processing_Percentage;
