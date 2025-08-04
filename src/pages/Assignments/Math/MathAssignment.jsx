import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "./MathAssignment.css";
import MathMCQ from "./MathMCQ";
import { useDispatch } from "react-redux";
import { fetchSignedImageUrl } from "../../store/action/students.action";
import LoaderModal from "../../Loader/LoaderModal";

export default function MathAssignment({ storagePath }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      console.log("Fetching signed URL for storage path:", storagePath);
      try {
        let actualStoragePath = storagePath;
        if (
          typeof storagePath === "object" &&
          storagePath !== null &&
          storagePath.storagePath
        ) {
          actualStoragePath = storagePath.storagePath;
        }
        const response = await dispatch(
          fetchSignedImageUrl({ storagePath: actualStoragePath })
        );
        const data = response?.payload;
        console.log("Signed URL data:", data);
        if (data.success) {
          setImageUrl(data.signedUrl);
        } else {
          console.error("Failed to get signed URL");
        }
      } catch (err) {
        console.error("Error fetching signed image URL", err);
      } finally {
        setLoadingImage(false);
      }
    };

    if (storagePath) fetchSignedUrl();
  }, [storagePath]);

  return (
    <Box className="assignment-layout">
      {!hideImage && (
        <Box className="left-panel">
          {loadingImage ? (
            <LoaderModal
              open={loadingImage}
              messages={["Loading assignment image..."]}
            />
          ) : (
            <>
              <Typography variant="h5" sx={{fontWeight: "bold", mb: 5}}>
                Assignment Image
              </Typography>
              <img
                src={imageUrl}
                alt="Assignment visual"
                className="assignment-image"
              />
            </>
          )}
        </Box>
      )}

      <Box className={`right-panel ${hideImage ? "full-width" : ""}`}>
        <Box className="top-controls">
          <FormControlLabel
            control={
              <Checkbox
                checked={hideImage}
                onChange={() => setHideImage((prev) => !prev)}
              />
            }
            label="Hide Image"
          />
        </Box>
        <MathMCQ storagePath={storagePath} />
      </Box>
    </Box>
  );
}
