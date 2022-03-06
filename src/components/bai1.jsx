import { useState } from "react";
import { TextField, Button, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// B1 Lấy số ngày công người dùng nhập vào form
// B2 Tính số tiền bằng số ngày công nhân 100000
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
function Bai1(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      bai1: yup
        .number()
        .required()
        .typeError("Vui lòng nhập số hợp lệ")
        .min(0, "Vui lòng nhập số lớn hơn 0"),
    })
    .required();
  const [money, setMoney] = useState(0);
  const [day, setDay] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (value = {}) => {
    setDay(value.bai1);
    // Tính số tiền công bằng số ngày công*100000
    setMoney(Number(value.bai1) * 100000);
  };
  return (
    <div>
      <div className={classes.head}>
        <h1>Bài1</h1>
        <h3 className="title">Đề Bài:</h3>
        <p>Viết chương trình tính lương nhân viên.</p>
        <p>Lương 1 ngày 100k.</p>
        <p>Cho người dùng nhập vào số ngày làm.</p>
        <p>Công thức tính lương: Lương 1 ngày * số ngày làm.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          required
          error={!!errors.bai1?.message}
          {...register("bai1", { min: 0 })}
          label="Số ngày công"
          helperText={errors.bai1?.message}
        />
        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {!!day && (
          <div className={classes.results}>
            <h2>{`Số ngày công: ${day}`}</h2>
            {/* Format tiền vietj nam đồng */}
            <h2>{`Số tiền: ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(money)}`}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bai1;
