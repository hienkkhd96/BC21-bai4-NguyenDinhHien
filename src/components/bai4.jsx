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
function Bai4(props) {
  const classes = useStyles();
  const schema = yup
    .object({
      lengthHcn: yup
        .number()
        .required()
        .typeError("Vui lòng nhập chiều dài hợp lệ"),
      widthHcn: yup
        .number()
        .required()
        .typeError("Vui lòng nhập chiều rộng hợp lệ"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitSuccessful,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [perimeter, setPerimeter] = useState(0);
  const [acreage, setAcreage] = useState(0);
  const onSubmit = (value = {}) => {
    setPerimeter((value.lengthHcn + value.widthHcn) * 2);
    setAcreage(value.lengthHcn * value.widthHcn);
  };
  console.log(perimeter, acreage);

  return (
    <div>
      <div className={classes.head}>
        <h1>Bài4</h1>
        <h3 className="title">Đề Bài:</h3>
        <p>Viết chương trình Nhập vào 2 chiều dài va chiều rộng của HCN.</p>
        <p>Tính và xuất ra chu vi va diện tích của HCN đó</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          required
          {...register("lengthHcn")}
          label="Chiều dài HCN"
          type="text"
          helperText={errors.lengthHcn?.message}
        />
        <TextField
          required
          {...register("widthHcn")}
          label="Chiều rộng HCN"
          type="text"
          helperText={errors.widthHcn?.message}
        />
        <div className={classes.button}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
        {isSubmitSuccessful ?? (
          <div className={classes.results}>
            <h3>{`Chu vi là ${perimeter}`}</h3>
            <h3>{`Diện tích là ${acreage}`}</h3>
          </div>
        )}
      </form>
    </div>
  );
}

export default Bai4;
