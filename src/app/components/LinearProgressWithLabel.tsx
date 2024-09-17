import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface CustomLinearProgressProps extends LinearProgressProps {
  value: number;
  fileName: string; // Agregar la propiedad fileName
}

const LinearProgressWithLabel: React.FC<CustomLinearProgressProps> = ({
  value,
  fileName, // Recibir la propiedad fileName
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={100} className={classes.fileName}>
        {/* Mostrar el nombre del archivo */}
        <Typography variant="body2" color="textSecondary" noWrap>
          {fileName}
        </Typography>
      </Box>
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
    width: "100%",
  },
  progressLabel: {
    position: "relative",
    top: 2,
    left: 20,
  },
  fileName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default LinearProgressWithLabel;
