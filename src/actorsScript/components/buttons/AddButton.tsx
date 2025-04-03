import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const AddButton = ({ icon }: {
    icon?: React.ReactNode
}) => {
    return (

        <IconButton size="large" sx={{
            color: 'white',
            backgroundColor: 'success.main',
            position: 'fixed',
            width: '50px',
            height: '50px',
            bottom: '50px',
            right: '50px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            },
        }} onClick={() => {
            // Handle the click event here
            console.log('Icon button clicked');
        }}>

            <Add />
            {icon}
        </IconButton>
    )
}
