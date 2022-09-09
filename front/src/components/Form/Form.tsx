import { Button, TextField, Grid, Link } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";

// Taken from https://formik.org/docs/examples/with-material-ui
// also https://codesandbox.io/s/simple-react-login-form-using-material-ui-with-custom-theme-lwic5?file=/src/App.js:316-339

export const Form = ({
  formik,
  textSecondButton,
  onClickSecondButton,
}: {
  formik: any;
  textSecondButton: string;
  onClickSecondButton: () => void;
}) => (
  <div>
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "100%", height: "100%", justifyContent: "center" }}
    >
      <Grid
        container
        spacing={4}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid
          item
          xs={12}
          style={{
            minWidth: "80%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={(formik.touched.email && formik.errors.email) || " "}
            inputProps={{ style: { fontSize: 24 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            minWidth: "80%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              (formik.touched.password && formik.errors.password) || " "
            }
            inputProps={{ style: { fontSize: 24 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          />
        </Grid>
        <Grid item xs={12} style={{ minWidth: "80%" }}>
          <Grid
            container
            spacing={6}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Grid item lg={3} md={6} xs={12}>
              <Button
                color="secondary"
                variant="outlined"
                type="submit"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Link
                component="button"
                variant="body2"
                onClick={onClickSecondButton}
              >
                {textSecondButton}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  </div>
);

export default Form;
