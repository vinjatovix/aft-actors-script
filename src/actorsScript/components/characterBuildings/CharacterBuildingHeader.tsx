import { Grid, Typography } from '@mui/material'
import { characterBuildingTranslationMap } from '../../../auth/pages/translationMap'
import { getTimeAgo } from '../../../utils/getTimeAgo'


const currentLanguage = localStorage.getItem("language") || "es_gl"
const translationMap = characterBuildingTranslationMap[currentLanguage]

export const CharacterBuildingHeader = ({ name, description, updatedAt
}: {
    name: string,
    description: string,
    updatedAt: string | null
}
) => {
    return (
        <Grid>
            <Typography fontSize={39} fontWeight="light" color="primary.main">
                {name} {translationMap.at}{" "}{description}
            </Typography>
            {updatedAt && <Typography variant="body2" color="textSecondary">
                {translationMap.updated} {getTimeAgo(updatedAt)}
            </Typography>}
        </Grid>
    )
}
