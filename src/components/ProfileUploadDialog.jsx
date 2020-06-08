import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { IconButton, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";
import "../scss/Appbar.scss";
const Service = require("../services/service");

export class ProfileUploadDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadImage: null,
      file: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl: null,
    };
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ file: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("image", this.state.croppedImage);
    Service.profileUpload(payload)
      .then((data) => {
        console.log("datat====================>", data.data.data);
        sessionStorage.setItem("imageUrl", data.data.data);
        this.props.handleClose();
      })
      .catch((error) => {
        console.log("error--------------->", error);
      });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className="profileUploadDialog">
            <div id="form-dialog-title">
              <span id="labelTitle">Select Profile Photo</span>
              <IconButton onClick={this.props.handleClose}>
                <ClearIcon />
              </IconButton>
            </div>
            <DialogContent>
              <div className="chooseFile">
                {this.state.file !== null ? (
                  <ReactCrop
                    className="profile"
                    src={this.state.file}
                    crop={this.state.crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                ) : (
                  <label id="uploadButton">
                    Select photo from your computer
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      onChange={this.handleFile}
                    />
                  </label>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} color="primary">
                Set as profile photo
              </Button>
              <Button onClick={this.props.handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ProfileUploadDialog;
