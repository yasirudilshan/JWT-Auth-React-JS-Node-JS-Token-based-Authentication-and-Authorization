import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Msg() {
  return (
    <Stack sx={{ width: '100%' }} spacing={5}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  )
}

export default Msg
