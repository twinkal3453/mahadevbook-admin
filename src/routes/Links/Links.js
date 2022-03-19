import * as React from "react";
import { useState, useEffect } from "react";
import { createSites, getSites, deleteSite, updateSites } from "./LinksApiCall";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./links.css";
import { PATH } from "../../backend";
// import { borderRadius } from "@mui/system";
import { isAutheticated } from "../../auth";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(235, 171, 35)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Links = () => {
  const fields = {
    picture: "",
    name: "",
    site: "",
    userId: "",
    password: "",
    points: "",
    fetchMinimum: "",
    fancyMinimum: "",
    loading: false,
    error: false,
  };
  const [sites, setSites] = useState([]);
  const [side, setSide] = useState(fields);
  const [open, setOpen] = React.useState(false);
  const [nameError, setNameError] = useState(false);
  const [siteError, setSiteError] = useState(false);
  const { id, token } = isAutheticated();
  const {
    picture,
    name,
    site,
    userId,
    password,
    points,
    fetchMinimum,
    fancyMinimum,
    loading,
    error,
  } = side;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSide(fields);
  };
  // console.log(sites);

  const preload = () => {
    getSites().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setSites(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h4>Loading...</h4>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div className="alert alert-info">
          <h4>Something went wrong</h4>
        </div>
      )
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setNameError(false);
    setSiteError(false);
    if (name === "") {
      setNameError(true);
    }
    if (site === "") {
      setSiteError(true);
    }
    if (name && site) {
      setSide({ ...side, loading: true });
      createSites(id, token, side)
        .then((data) => {
          setSide({
            ...side,
            picture: "",
            name: "",
            site: "",
            userId: "",
            password: "",
            points: "",
            fetchMinimum: "",
            fancyMinimum: "",
            error: false,
          });
          preload();
          handleClose();
        })
        .catch((err) => {
          setSide({ ...side, error: true });
        });
    }
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "picture" ? event.target.files[0] : event.target.value;
    setSide({ ...side, [name]: value });
    console.log(event.target.value, value);
  };

  const deleteSiteById = (siteId) => {
    deleteSite(siteId, id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const onEdit = (sideId) => {
    const index = sites.findIndex((r, i) => r.id === sideId);
    setSide(sites[index]);
    handleClickOpen();
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setNameError(false);
    setSiteError(false);

    if (name === "") {
      setNameError(true);
    }
    if (site === "") {
      setSiteError(true);
    }

    if (name && site) {
      setSide({ ...side, loading: true });
      console.log(side.id);
      updateSites(side.id, id, token, side)
        .then((data) => {
          preload();
          handleClose();
        })
        .catch((err) => {
          setSide({ ...side, error: true });
        });
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Site</StyledTableCell>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell>Password</StyledTableCell>
              <StyledTableCell>Points</StyledTableCell>
              <StyledTableCell>fetch Minimum</StyledTableCell>
              <StyledTableCell>Fancy Minimum</StyledTableCell>
              <StyledTableCell>U/D</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <img width="150px" src={`${PATH}${row.picture}`} alt="pic" />
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.site}</StyledTableCell>
                <StyledTableCell>{row.userId}</StyledTableCell>
                <StyledTableCell>{row.password}</StyledTableCell>
                <StyledTableCell>{row.points}</StyledTableCell>
                <StyledTableCell>{row.fetchMinimum}</StyledTableCell>
                <StyledTableCell>{row.fancyMinimum}</StyledTableCell>
                <StyledTableCell className="dButton">
                  <button
                    onClick={() => {
                      onEdit(row.id);
                    }}
                    className="update__button"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => {
                      deleteSiteById(row.id);
                    }}
                    className="delete__button"
                  >
                    <DeleteIcon />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button
          className="button__dilog"
          style={{
            backgroundColor: "rgb(235, 171, 35)",
            borderRadius: "2rem",
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            padding: ".5rem 1.2rem",
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Sites
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          // onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {side.id ? "Update Site" : "Add Site"}
            {loadingMessage()}
            {errorMessage()}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <form>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    onChange={handleChange("picture")}
                    variant="standard"
                    type="file"
                    name="photo"
                    accept="image"
                    fullWidth
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("name")}
                    required
                    error={nameError}
                    value={name}
                    fullWidth
                    variant="standard"
                    label="Name"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("site")}
                    required
                    error={siteError}
                    value={site}
                    variant="standard"
                    fullWidth
                    label="Site"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("userId")}
                    value={userId}
                    variant="standard"
                    fullWidth
                    label="User ID"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("password")}
                    value={password}
                    variant="standard"
                    fullWidth
                    label="Password"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("points")}
                    value={points}
                    variant="standard"
                    fullWidth
                    label="Points"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("fetchMinimum")}
                    value={fetchMinimum}
                    variant="standard"
                    fullWidth
                    label="Fetch Minimum"
                    id="fullWidth"
                  />
                  <TextField
                    onChange={handleChange("fancyMinimum")}
                    value={fancyMinimum}
                    variant="standard"
                    fullWidth
                    label="Fancy Minimum"
                    id="fullWidth"
                  />
                </Box>
              </form>
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancel
            </Button>
            <Button onClick={side.id ? onUpdate : onSubmit} variant="outlined">
              {side.id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Links;
