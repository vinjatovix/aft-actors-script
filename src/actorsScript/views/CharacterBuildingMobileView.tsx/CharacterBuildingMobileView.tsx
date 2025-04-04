import { Box } from '@mui/material'
import { PageHeader } from '../../components/PageHeader'
import EngineeringIcon from '@mui/icons-material/Engineering';
import { CharacterBuilding } from '../../../redux/interfaces/characterBuildingInterfaces';
import { CharacterBuildingCard } from '../../components/characterBuildings/CharacterBuildingCard';
import { AddButton } from '../../components/buttons/AddButton';

export const CharacterBuildingMobileView = ({ characterBuilding }: {
    characterBuilding: CharacterBuilding
}) => {
    if (!characterBuilding) {
        return null;
    }
    return (
        <Box sx={{
            display: {
                xs: 'block',
                sm: 'none',
                md: 'none',

            }
        }}>

            <PageHeader
                icon={<EngineeringIcon />}
                title="Construccións de persoaxe"
            />

            {/* {loading && <p>Cargando construcciones...</p>} */}

            {/* {error && <p>Error: {error}</p>} */}

            {/* {!loading && !characterBuildings.length && (
                <p>No hay construcciones disponibles</p>
            )} */}

            {(<div className="card-container">
                {/* {characterBuildings.map((characterBuilding: CharacterBuilding) => ( */}
                <CharacterBuildingCard
                    key={characterBuilding.id}
                    {...characterBuilding}
                />
                {/* ))} */}
            </div>)}

            <AddButton icon={<EngineeringIcon />} />

        </Box>

    )
}
