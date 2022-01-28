import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Icon } from "@mui/material";

const useTreeItemStyles = makeStyles( ({
  content: {
    flexDirection: "row-reverse"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: '10px'
  },
  labelIcon: {
    marginRight: '10px'
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText,handleAddChange, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <Icon onClick={() => handleAddChange()}>add</Icon>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      classes={{
        content: classes.content
      }}
      {...other}
    />
  );
}

const TreeConfig = props => {
  const { treeData,handleTreeViewChange,handleTreeClick} = props;
  const renderTree = nodes => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      labelText={nodes.name}
      handleAddChange={() => handleTreeViewChange(nodes)}
      onClick={() => handleTreeClick(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: "100%",
        marginRight: "35px",
        flexGrow: 1,
        width: 400,
        overflowY: "auto"
      }}
    >
      {treeData.map(item => renderTree(item))}
    </TreeView>
  );
};

export default TreeConfig;
