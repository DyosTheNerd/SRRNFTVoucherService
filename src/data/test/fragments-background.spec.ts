import {fragments} from "../fragments";
import {PNGFromSvgGenerator} from "../../service/svg-generator-service";
import {FileBackupService} from "../../service/file-backup-service";

const pngFromSVGGenerator = new PNGFromSvgGenerator()
const fileBackupService = new FileBackupService()

describe("background-colors", () => {


    it.each`
    color
    ${"midBlue"}
    ${"darkRed"}
    ${"darkGreen"}
    ${"midOrange"}
    ${"darkTurquoise"}
    ${"deepPurple"}
    ${"midviolet"}
    ${"skyblue"}
    `("returns a fragment that can be templated", async ({color}) => {
        const svgFragment = fragments.getAsSVG(fragments.background.get(color))
        const pngContent = await pngFromSVGGenerator.transform(svgFragment)
        await fileBackupService.writePngToBackupLocation(pngContent, `verification/color/${color}`, "only")
    })

})