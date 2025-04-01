import { Typography } from "@mui/material"

export const PageHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => {
    return (
        <div className="page-header">
            {icon}
            <Typography variant="h5">{title}</Typography>
        </div>
    )
}
