import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../store/Form/slice";

const FormList = () => {
  const [inputValue, setInputValue] = useState();

  const [inputErr, setInputErr] = useState();
  const { formEdit } = useSelector((state) => state.formL);

  const dispatch = useDispatch();
  const valadtion = (ele) => {
    const { validity, minLength, value, title } = ele;
    const { valueMissing, tooShort, patternMismatch } = validity;
    let mess = "";
    if (valueMissing) {
      mess = `${title} không được để trống`;
    } else if (tooShort || value.length < minLength) {
      mess = `${title} tối thiếu ${minLength} ký tự`;
    } else if (patternMismatch) {
      if (title == "Mã sinh viên") {
        mess = `${title} phải là số`;
      } else if (title == "Email") {
        mess = `${title} không đúng định dạng`;
      } else if (title == "Tên sinh viên") {
        mess = `${title} phải là chữ`;
      }
    }
    return mess;
  };
  const handleValue = () => (ev) => {
    const { name, value } = ev.target;
    let mess = valadtion(ev.target);
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    setInputErr({
      ...inputErr,
      [name]: mess,
    });
  };
  useEffect(() => {
    if (!formEdit) return;
    setInputValue(formEdit);
  }, [formEdit]);
  return (
    <div className="mt-3">
      <h3>I. Điền thông tin sinh viên</h3>
      <form
        noValidate
        onSubmit={(v) => {
          v.preventDefault();
          let error = {};
          const element = document.querySelectorAll("input");
          element.forEach((v) => {
            const { name } = v;
            error[name] = valadtion(v);
          });
          setInputErr(error);
          let isFlag = true;
          for (let key in error) {
            if (error[key]) return (isFlag = false);
          }
          if (!isFlag) return;

          if (!formEdit) {
            dispatch(formAction.setFormList(inputValue));
            setInputValue("");
          } else {
            dispatch(formAction.updateForm(inputValue));
            setInputValue("");
          }
        }}
      >
        <div className="row">
          <div className="col-6">
            <p>1. Mã sinh viên</p>
            <input
              required
              minLength={5}
              maxLength={8}
              disabled={!!formEdit}
              title="Mã sinh viên"
              pattern="^[0-9]+$"
              value={inputValue?.id || ""}
              name="id"
              type="text"
              className="form-control"
              onChange={handleValue()}
            />
            <p className="text-danger">{inputErr?.id}</p>
          </div>
          <div className="col-6">
            <p>2. Tên sinh viên</p>
            <input
              required
              minLength={8}
              title="Tên sinh viên"
              pattern="^([a-zA-ZÀ-ỹ]+\s)*[a-zA-ZÀ-ỹ]+$"
              value={inputValue?.name || ""}
              name="name"
              type="text"
              className="form-control"
              onChange={handleValue()}
            />
            <p className="text-danger">{inputErr?.name}</p>
          </div>
          <div className="col-6">
            <p>3. Email</p>
            <input
              required
              title="Email"
              pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
              value={inputValue?.email || ""}
              name="email"
              type="text"
              className="form-control"
              onChange={handleValue()}
            />
            <p className="text-danger">{inputErr?.email}</p>
          </div>
          <div className="col-6">
            <p>4. Địa chỉ</p>
            <input
              value={inputValue?.addr || ""}
              name="addr"
              type="text"
              className="form-control"
              onChange={handleValue()}
            />
            <p className="text-danger">{inputErr?.addr}</p>
          </div>
          <div>
            {formEdit ? (
              <button className="btn btn-primary">Update</button>
            ) : (
              <button className="btn btn-success">Create</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormList;
