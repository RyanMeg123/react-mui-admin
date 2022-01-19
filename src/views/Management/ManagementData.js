import React, { useState } from "react";

import { Card, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const ManagementBox = styled("div")(() => ({
  margin: "30px"
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "40px"
}));

const TitleBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
}));

const IconBox = styled(Box)(() => ({
    
}))

const ManagementData = () => {
  return (
    <>
      <ManagementBox>
        <StyledCard>
          <TitleBox>
            <Typography sx={{ fontSize: "18px" }} component="h2">
                当前总预注册人数:
            </Typography>

          </TitleBox>
        </StyledCard>
      </ManagementBox>
    </>
  );
};

export default ManagementData;
