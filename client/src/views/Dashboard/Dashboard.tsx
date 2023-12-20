import { Box, Grid } from "@mui/material"
import SalesOverview from "./components/SalesOverview"
import ProductPerformance from "./components/ProductPerformance"

type Props = {}

export default function Dashboard({ }: Props) {
    return (
        <Box>
            <Grid container spacing={0}>
                {/* ------------------------- row 1 ------------------------- */}
                <Grid item xs={12} lg={12}>
                    <SalesOverview />
                </Grid>
                {/* ------------------------- row 2 ------------------------- */}
                <Grid item xs={12} lg={4}>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ProductPerformance />
                </Grid>
                {/* ------------------------- row 3 ------------------------- */}
            </Grid>
        </Box>
    )
}