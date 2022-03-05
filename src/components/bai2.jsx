import { Button, createTheme, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  button: {
    marginTop: "40px",
  },
  results: {
    marginTop: "20px",
  },
});
function Bai2(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      so1: yup.number().required().typeError("Vui lòng nhập 1 số thực"),
      so2: yup.number().required().typeError("Vui lòng nhập 1 số thực"),
      so3: yup.number().required().typeError("Vui lòng nhập 1 số thực"),
      so4: yup.number().required().typeError("Vui lòng nhập 1 số thực"),
      so5: yup.number().required().typeError("Vui lòng nhập 1 số thực"),
    })
    .required();

  const {
    register,
    handleSubmit,
    isSubmitSuccessful,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState(undefined);
  const onSubmit = (value = {}) => {
    const data = getValues();
    const total =
      Number(data.so1) +
      Number(data.so2) +
      Number(data.so3) +
      Number(data.so4) +
      Number(data.so5);
    setResult(total / 5);
  };

  return (
    <div>
      <div className={classes.head}>
        <h1>Bài2</h1>
        <h3 className="title">Đề Bài:</h3>
        <p>Viết chương trình Nhập vào 5 số thực.</p>
        <p>Tính giá trị trung bình của 5 số này và in ra màn hình</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          {...register("so1")}
          label="Số thứ nhất"
          helperText={errors.so1?.message}
        />
        <TextField
          {...register("so2")}
          label="Số thứ hai"
          helperText={errors.so2?.message}
        />
        <TextField
          {...register("so3")}
          label="Số thứ ba"
          helperText={errors.so3?.message}
        />
        <TextField
          {...register("so4")}
          label="Số thứ tư"
          helperText={errors.so4?.message}
        />
        <TextField
          {...register("so5")}
          label="Số thứ năm"
          helperText={errors.so5?.message}
        />
        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {isSubmitSuccessful ?? (
          <div className={classes.results}>
            <h3>{`Kết quả là ${result}`}</h3>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bai2;
