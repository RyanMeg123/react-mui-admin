import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Card,
  Button,
  ImageList,
  ImageListItem,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": {
      "& th": {
        padding: "1.6rem 1rem",
        backgroundColor: "rgb(246, 247, 251)"
      }
    }
  },
  "& tbody": {
    "& tr": {
      "& td": {
        paddingLeft: 0,
        textTransform: "capitalize",
        padding: "1.6rem 1rem"
      }
    }
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "20px"
}));

const BoxBtn = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  margin: "20px 0 20px 13px"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "序号"
  },
  {
    id: "language",
    numeric: true,
    disablePadding: false,
    label: "语种"
  },
  {
    id: "server",
    numeric: true,
    disablePadding: false,
    label: "服务器"
  },
  {
    id: "roleName",
    numeric: true,
    disablePadding: false,
    label: "角色名称"
  },
  {
    id: "text",
    numeric: true,
    disablePadding: false,
    label: "留言内容"
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "留言时间"
  },
  {
    id: "images",
    numeric: true,
    disablePadding: false,
    label: "上传图片"
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "状态"
  },
  {
    id: "actionStatus",
    numeric: true,
    disablePadding: false,
    label: "操作"
  }
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headCell.id}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = event => {
    console.log(event.target.checked, "event.target.checked");
    if (event.target.checked) {
      const newSelecteds = props.tableList.map(n => n.id);
      console.log(newSelecteds, "fslfh");
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const switchChange = text => {
    switch (text) {
      case "en":
        return "英语";
      case "ru":
        return "俄语";
      case "es":
        return "西语";
      case "pt":
        return "葡语";
      case "de":
        return "德语";
      case "fr":
        return "法语";
    }
  };

  const StandardImageList = imagesList => {
    return (
      <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
        {imagesList.map((item, index) => (
          <ImageListItem key={index}>
            <img src={`${item}`} srcSet={`${item}`} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  const StatusReset = status => {
    if (status === 0) {
      return <Box>未审批</Box>;
    } else if (status === 1) {
      return (
        <Box
          sx={{
            color: "green"
          }}
        >
          已通过
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            color: "redd"
          }}
        >
          已拒绝
        </Box>
      );
    }
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <StyledCard>
      <BoxBtn>
        <StyledButton
          variant="contained"
          sx={{
            background: "#007FFF"
          }}
        >
          批量通过
        </StyledButton>
        <StyledButton
          variant="contained"
          sx={{
            background: "#FF4D4F"
          }}
        >
          批量拒绝
        </StyledButton>
      </BoxBtn>
      <Box
        width="100%"
        overflow="auto"
        sx={{
          maxHeight: "calc(100vh - 376px)",
          marginBottom: "20px"
        }}
      >
        <StyledTable stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            // onRequestSort={handleRequestSort}
            rowCount={props.tableList.length}
          />
          <TableBody>
            {props.tableList.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={event => handleClick(event, row.id)}
                      inputProps={{
                        "aria-labelledby": labelId
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{switchChange(row.language)}</TableCell>
                  <TableCell>{row.server}</TableCell>
                  <TableCell>{row.roleName}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>
                    {dayjs(row.createdAt * 1000).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>{StandardImageList(row.images)}</TableCell>
                  <TableCell>{StatusReset(row.status)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={-1}>
                      {row.status === 0 && (
                        <>
                          <Button
                            sx={{
                              color: "#007FFF"
                            }}
                            onClick={e => props.handleActionChange(e, row)}
                          >
                            通过
                          </Button>
                          <Button
                            sx={{
                              color: "#fa5155"
                            }}
                            onClick={e => props.handleActionChange(e, row)}
                          >
                            拒绝
                          </Button>
                        </>
                      )}
                      {row.status === 1 && (
                        <Button
                          sx={{
                            color: "#fa5155"
                          }}
                          onClick={e => props.handleActionChange(e, row)}
                        >
                          修改为拒绝
                        </Button>
                      )}
                      {row.status === 2 && (
                        <Button
                          sx={{
                            color: "#007FFF"
                          }}
                          onClick={e => props.handleActionChange(e, row)}
                        >
                          修改为通过
                        </Button>
                      )}

                      <Button onClick={e => props.jumpToDetailChange(e, row)}>
                        详情
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.tableList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledCard>
  );
}
