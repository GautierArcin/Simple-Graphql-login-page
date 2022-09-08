import { Paper, Button, TextField, Grid } from "@material-ui/core";

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
  <div
    style={{
      padding: 30,
      display: "flex",
      flexWrap: "wrap",
      textAlign: "center",
      justifyContent: "center",
    }}
  >
    <Paper
      style={{
        padding: 30,
        width: "40%",
        justifyContent: "center",
      }}
    >
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
              minWidth: "70%",
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
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              minWidth: "70%",
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
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item md={4} xs={12}>
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item md={4} xs={12}>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  onClick={onClickSecondButton}
                >
                  {textSecondButton}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </div>
);

export default Form;
