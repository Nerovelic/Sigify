import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface CustomLinearProgressProps extends LinearProgressProps {
  value: number;
}

const LinearProgressWithLabel: React.FC<CustomLinearProgressProps> = ({
  value,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1} className={classes.progressBar}>
        <LinearProgress variant="determinate" value={value} {...props} />
      </Box>
      <Box minWidth={35} className={classes.progressLabel}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  progressBar: {
    position: "absolute",
    top: 220,
    right: 10,
    left: 200,
    width: "33%",
  },
  progressLabel: {
    position: "relative",
    top: 2,
    left: 10,
  },
});

export default LinearProgressWithLabel;
