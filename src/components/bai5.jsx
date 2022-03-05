import { useState } from "react";
import { TextField, Button, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
        .integer()
        .required()
        .typeError("Vui lòng nhập 1 nguyên hợp lệ")
        .min(0, "Vui lòng nhập số lớn hơn 0"),
    })
    .required();
  const [result, setResult] = useState(0);
  const {
    register,
    handleSubmit,
    isSubmitSuccessful,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function getResult(number, after) {
    if (number > 0) {
      after = Math.floor(number % 10) + after;
      setResult(after);
      number = Math.floor(number / 10);
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
          type="number"
          error={!!errors.number1?.message}
          {...register("number1", {
            min: 0,
            message: "Vui lòng nhập số lớn hơn 0",
          })}
          label="Nhập số"
          helperText={errors.number1?.message}
        />

        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {isSubmitSuccessful ?? (
          <div className={classes.results}>
            <h2>{`Tổng ký số: ${result}`}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bai5;
