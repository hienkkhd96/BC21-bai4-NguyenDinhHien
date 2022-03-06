import { useState } from "react";
import { TextField, Button, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// BÀI CÓ NHIỀU CÁCH LÀM: DÙNG VÒNG LẶP,ĐỆ QUY, TÁCH THÀNH MẢNG RỒI DÙNG REDUCER
// Đề bài chỉ yêu cầu số có 2 chữ số nhưng em làm số nhiều hơn 2 chữ số cũng dùng được
// Em dùng đệ quy để chia lấy dư cho 10

// B1 Lấy số người dùng nhập vào form
// B2 Dùng đệ quy lăp lại hàm getResult(): Hàm getResult thực hiện chia lấy dư cho 10 và gán cho giá trị after
// B3 Xuất ra màn hình kết quả

const theme = createTheme();
const useStyles = makeStyles({
  root: {},
  head: {
    marginTop: "40px",
    "&>h1": {
      color: theme.palette.primary.dark,
      fontSize: "40px",
    },
    "&>h3": {
      marginTop: "20px",
    },
    "&>p": {
      color: theme.palette.info.dark,
    },
  },
  form: {
    marginTop: "20px",
  },
  errors: {
    marginTop: "10px",
    color: theme.palette.error.main,
  },
  button: {
    marginTop: "40px",
  },
  results: {
    marginTop: "20px",
  },
});
function Bai5(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      number1: yup
        .number()
        .integer("Vui lòng nhập 1 số nguyên hợp lệ")
        .required()
        .positive("Vui lòng nhập số lớn hơn 0")
        .typeError("Vui lòng nhập 1 nguyên hợp lệ"),
    })
    .required();
  const [result, setResult] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function getResult(number, after) {
    if (number > 0) {
      after = Math.floor(number % 10) + after;
      number = Math.floor(number / 10);
      setResult(after);
      getResult(number, after);
    }
    return after;
  }
  const onSubmit = (value = {}) => {
    let number = Number(value.number1);
    let after = 0;

    getResult(number, after);
  };
  return (
    <div>
      <div className={classes.head}>
        <h1>Bài5</h1>
        <h3 className="title">Đề Bài:</h3>
        <p>Viết chương trình nhập vào 1 số có 2 chũ số.</p>
        <p>Tính tổng 2 ký ố vừa nhập.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          error={!!errors.number1?.message}
          {...register("number1")}
          label="Nhập số"
          helperText={errors.number1?.message}
        />

        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {!!result && (
          <div className={classes.results}>
            <h2>{`Tổng ký số: ${result}`}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bai5;
