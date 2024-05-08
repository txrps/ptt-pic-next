import * as MuiIcons from '@mui/icons-material'

const IconComponents = (sIcon: string) => {
  if (sIcon) {
    const Icon = MuiIcons[sIcon]
    return <Icon sx={{ mr: 0.5}} color={'while'} />;
  }
  else {
    return null;
  }
}

export default  IconComponents;