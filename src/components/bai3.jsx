import { useState } from "react";
import { TextField, Button, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// B1 Lấy số USD người dùng nhập vào form
// B2 Quy đổi sang VND theo tỉ giá cho trước: 23500
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
function Bai3(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      usd: yup
        .number()
        .required()
        .typeError("Vui lòng nhập số usd hợp lệ")
        .min(0, "Vui lòng nhập số lớn hơn 0"),
    })
    .required();
  const [usd, setUsd] = useState(0);
  const [vnd, setVnd] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (value = {}) => {
    setUsd(value.usd);
    setVnd(Number(value.usd) * 23500);
  };
  return (
    <div>
      <div className={classes.head}>
        <h1>Bài3</h1>
        <h3 className="title">Đề Bài:</h3>
        <p>Viết chương trình quy đổi từ USD sang VND.</p>
        <p>Tỉ giá là 1USD = 23.5000VND</p>
        <p>Cho người dùng nhập vào số tiền USD.</p>
        <p>Tính và xuất ra số tiền sau quy đổi sang VND.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          required
          error={!!errors.usd?.message}
          type="text"
          {...register("usd")}
          label="Số tiền USD"
          helperText={errors.usd?.message}
        />
        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {isSubmitSuccessful ? (
          <div className={classes.results}>
            <h2>{`USD: ${usd}`}</h2>
            <h2>{`VND: ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(vnd)}`}</h2>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Bai3;
