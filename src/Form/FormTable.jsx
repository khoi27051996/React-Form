import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formAction } from "../store/Form/slice";
import { useQueryUrl } from "../hooks/useQueryUrl";

const FormTable = () => {
  const { formList } = useSelector((state) => state.formL);
  const [inputValue, setInputValue] = useState();
  console.log(inputValue);
  const [queryParam, setQueryParam] = useQueryUrl();

  const nameSearch = formList.filter((v) =>
    v.name.toLowerCase().includes(queryParam.nameSv?.toLowerCase())
  );
  const dispatch = useDispatch();
  return (
    <div className="mt-3">
      <h3>II. Danh sách sinh viên</h3>
      <div className="my-3">
        <input
          value={inputValue || ""}
          type="text"
          placeholder="Tìm tên sinh viên"
          onChange={(v) => {
            setInputValue(v.target.value);
          }}
          onKeyDown={(v) =>
            v.key == "Enter" &&
            setQueryParam({
              nameSv: inputValue || undefined,
            })
          }
        />
        <button
          className="btn btn-success ms-3"
          onClick={() => {
            setQueryParam({
              nameSv: inputValue || undefined,
            });
          }}
        >
          Search
        </button>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <td>STT</td>
            <td>Mã sinh viên</td>
            <td>Tên sinh viên</td>
            <td>Email</td>
            <td>Địa chỉ</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {(queryParam.nameSv ? nameSearch : formList).map((v, index) => {
            return (
              <tr key={v.id}>
                <td>{index + 1}</td>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.addr}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(formAction.editsForm(v));
                    }}
                  >
                    Edits
                  </button>
                  <button
                    className="btn btn-dark ms-3"
                    onClick={() => {
                      dispatch(formAction.detleteForm(v));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
