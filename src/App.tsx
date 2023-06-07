import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
const App = () => {
  const [input, setInput] = useState(""); //รับค่าinput 
  const [errorMessage, setErrorMessage] = useState(""); //ข้อมูล error 
  const [openParenthesis, setOpenParenthesis] = useState<number[]>([]); //เก็บตำเเหน่งวงเล็บเปิดที่ต้องใส่
  const [closeParenthesis, setCloseParenthesis] = useState<number[]>([]); //เก็บตำเเหน่งวงเล็บปิดที่ต้องใส่
  const [countOpen, setCountOpen] = useState(0); //นับตัวที่ต้องเพิ่มวงเล็บเปิด
  const [countClose, setCountClose] = useState(0); //นับตัวที่ต้องเพิ่มวงเล็บปิด
  const [checkLength, setcheckLength] = useState(false); //เงื่อนไขสถานะ ถ้าเข้าเงื่อนไข error จะไม่เเสดงผลลัพธ์ ถ้าไม่เข้าก็เเสดงผลลัพธ์
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { //ฟังก์ชั่นhandle การรับข้อมูลเข้ามาเก็บใน state
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  const checkParentheses = () => { //ฟังก์ชั่นหาผลลัพธ์
    console.log("input:", input.length);
    if (input.length === 0) { //เมื่อไม่ได้กรอกอะไรเเล้วกดปุ่มตรวจสอบ
      setErrorMessage("");
      setCountOpen(0);
      setCountClose(0);
      setOpenParenthesis([]);
      setCloseParenthesis([]);
      setcheckLength(false);
      return;
    }
    if (input.match(/[^()]/)) {//error เมื่อกรอกข้อมูลที่ไม่ใช่วงเล็บเปิดหรือวงเล็บปิด
      setErrorMessage("คุณสามารถใส่ได้เฉพาะวงเล็บเปิดและปิดเท่านั้น");
      setCountOpen(0);
      setCountClose(0);
      setOpenParenthesis([]);
      setCloseParenthesis([]);
      setcheckLength(false);
      return;
    }
    if (input.length > 30) { //error เมื่อกรอกข้อมูลเกิน
      setErrorMessage("คุณใส่ข้อมูลเกิน");
      setCountOpen(0);
      setCountClose(0);
      setOpenParenthesis([]);
      setCloseParenthesis([]);
      setcheckLength(false);
      return;
    }
    //เงื่อนไขต่างๆของ
    const parenthesesArray = Array.from(input);  //เก็บเป็น array จาก input
    //console.log("parenthesesArray:", parenthesesArray);
    const openParenthesis: number[] = []; //เก็บตำเเหน่งวงเล็บเปิด
    const closeParenthesis: number[] = []; //เก็บตำเเหน่งวงเล็บปิด
    for (let i = 0; i < parenthesesArray.length; i++) {
      console.log("length", parenthesesArray.length);
      if (i === 0) { //ตำเเหน่งเริ่มต้น
        if (parenthesesArray[i] === "(" && parenthesesArray[i + 1] !== ")") {
          closeParenthesis.push(i + 2);
        } else if (parenthesesArray[i] === ")") {
          openParenthesis.push(i + 1);
        }
      } else if (i >= 1 && i !== parenthesesArray.length - 1) { //ตำเเหน่งระหว่างเริ่มต้นกับสุดท้าย
        if (parenthesesArray[i] === "(" && parenthesesArray[i + 1] !== ")") {
          closeParenthesis.push(i + 2);
        } else if (parenthesesArray[i] === ")" && parenthesesArray[i - 1] !== "(") {
          openParenthesis.push(i + 1);
        }
      } else if (i === parenthesesArray.length - 1) { //ตำเเหน่งสุดท้าย
        if (parenthesesArray[i] === ")" && parenthesesArray[i - 1] !== "(") {
          openParenthesis.push(i + 1);
        } else if (parenthesesArray[i] === "(") {
          closeParenthesis.push(i + 2);
        }
      }
    }
    
    //console.log("openParenthesis.length:", openParenthesis.length);
    //console.log("closeParenthesis.length:", closeParenthesis.length);
    const countOpen = openParenthesis.length; //จำนวนของวงเล็บเปิดที่ต้องใส่เพิ่ม
    const countClose = closeParenthesis.length; //จำนวนของวงเล็บปิดที่ต้องใส่เพิ่ม

    if(countOpen !==0 || countClose !==0){ //check ว่าจำนวนของวงเล็บเปิดหรือจำนวนของวงเล็บปิด ไม่เท่ากับ0 ก็เเสดงว่าไม่ได้เข้าerror จึงเเสดงผลลัพธ์
      setcheckLength(true);
    }

    setCountOpen(countOpen);
    setCountClose(countClose);
    setOpenParenthesis(openParenthesis);
    setCloseParenthesis(closeParenthesis);
    setErrorMessage("");
  };

  return (
    <div className="container">
      <h1>ข้อที่1</h1>
      <h3>#ให้ใส่วงเล็บเปิดหรือวงเล็บปิดเท่านั้นในช่องว่าง</h3>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={checkParentheses}>ตรวจสอบ</button>
      {errorMessage && <p><span className="error">ล้มเหลว:</span> {errorMessage}</p>}
      {
        (checkLength  && (
          <p>
            ต้องใส่วงเล็บเปิดเพิ่ม : {countOpen} ตัว
            <br />
            ต้องใส่วงเล็บปิดเพิ่ม : {countClose} ตัว
            <br />
            ตำแหน่งที่ต้องใส่วงเล็บเปิดคือ : {openParenthesis.join(", ")}
            <br />
            ตำแหน่งที่ต้องใส่วงเล็บปิดคือ : {closeParenthesis.join(", ")}
          </p>
        ))}
    </div>
  );
};

export default App;
