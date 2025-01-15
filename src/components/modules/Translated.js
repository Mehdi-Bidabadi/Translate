"use client"
import { useEffect, useState } from "react";

import styles from "./Translate.module.css"

function Translated() {
    const [inputLanguage, setInputLanguage] = useState("English")
      const [outputLanguage, setOutputLanguage] = useState("persian")
      const [userPrompt, setUserPrompt] = useState("")
      const [inputText, setInputText] = useState("black")
      const [result, setResult] = useState("")
    
      const [language, setLanguage] = useState([])
    
      const [textProperties, setTextProperties] = useState({
        fontSize: "text-base",
        fontColor: "text-black",
        textAlign: "text-left",
        fontFamily: "font-sans",
      });
    
    
    
    
      useEffect(() => {
        const fetchLanguages = async () => {
          try {
            const response = await fetch("http://localhost:9090/translate/get-all-languages");
            if (!response.ok) {
              throw new Error("Failed to fetch languages");
            }
            const json = await response.json();
            setLanguage(json);
          } catch (error) {
            console.error("Error fetching data:", error);
            alert("خطا در دریافت اطلاعات از سرور. لطفاً دوباره تلاش کنید.");
          }
        };
      
        fetchLanguages();
      }, []);
    
      const updateProperty = (property, value) => {
        setTextProperties((prev) => ({
          ...prev,
          [property]: value,
        }));
      };
    
      const submitHandlerx = async () => {
        const res = await fetch("http://localhost:9090/translate/translate-text", {
          method: "POST",
          body: JSON.stringify({
            inputLanguage,
            outputLanguage,
            userPrompt,
            inputText,
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json();
        setResult(data.translatedText)
    
      };
  return (
    <div className="p-4 " >

      <div className="m-3 my-5 ">

        <div className={`flex gap-4 mb-4 border-b pb-2 w-[100%] ${styles.option}`}>
          {/* Font Family */}
          <select
            className={"border rounded px-2 py-1"}
            onChange={(e) => updateProperty("fontFamily", e.target.value)}
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Monospace</option>
          </select>

          {/* Font Size */}
          <select
            className="border rounded px-2 py-1"
            onChange={(e) => updateProperty("fontSize", e.target.value)}
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>

          {/* Font Color */}
          <select
            className="border rounded px-2 py-1"
            onChange={(e) => updateProperty("fontColor", e.target.value)}
          >
            <option value="text-black">Black</option>
            <option value="text-red-500">Red</option>
            <option value="text-blue-500">Blue</option>
            <option value="text-green-500">Green</option>
          </select>

          {/* Text Align */}
          <select
            className="border rounded px-2 py-1"
            onChange={(e) => updateProperty("textAlign", e.target.value)}
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
            <option value="text-justify">Justify</option>
          </select>
        </div>


      </div>
      <div className="flex justify-between items-center w-[100%] bg-[#808080] rounded">
        <div className={`flex justify-between w-[55%] ${styles.language}`}>

          <div className="m-3 my-5 w-[45%] flex items-center">
            <select className="h-12 rounded" onChange={(e) => setInputLanguage(e.target.value)}>
              {language.map((e, index) => (

                <option key={index}>{!e ? "eeeeeeeeeeeeee" : e}</option>
              ))}
            </select>
          </div>

          <div className="m-3 my-5 w-[45%] flex items-center">
            <select className="h-12 rounded" onChange={(e) => setOutputLanguage(e.target.value)}>
              {language.map((e, index) => (
                <option key={index} >{language.length === 0 ? "Engli" : e}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="m-3 my-5 w-[80%]">



          <input type="text" placeholder="userPrompt" onChange={(e) => setUserPrompt(e.target.value)}
            className={`${textProperties.fontSize} ${textProperties.fontColor} ${textProperties.fontFamily} ${textProperties.textAlign} border w-[100%] rounded h-16 p-2 `}
          />
        </div>
      </div>
      <div className="bg-[#808080] rounded">
        <div className="m-3 py-2 pb-3">



          <input type="text" placeholder="inputText" onChange={(e) => setInputText(e.target.value)}
            className={`${textProperties.fontSize} ${textProperties.fontColor} ${textProperties.fontFamily} ${textProperties.textAlign} border w-full rounded h-20 p-2`}
          />
        </div>
      </div>



      <div className="w-[100%] flex justify-center my-6">

        <span className="w-[45%] h-[2px] bg-slate-400 m-3"></span>
        <p>Result</p>
        <span className="w-[45%] h-[2px] bg-slate-400 m-3"></span>
      </div>

      <div className=" flex justify-center items-center bg-[#808080] rounded">
        <p className=" bg-white m-3 w-full p-2  rounded h-20">{result}</p>
      </div>
      <div className="bg-slate-600 p-1  mx-auto flex justify-center max-w-64 rounded my-5" onClick={submitHandlerx}>
        <button className="text-[#fff]">Translation</button>
      </div>
    </div>
  )
}

export default Translated