import { ReactComponent as Australia } from './circuits/australia.svg'
import { ReactComponent as Austria } from './circuits/austria.svg'
import { ReactComponent as Azerbaijan } from './circuits/azerbaijan.svg'
import { ReactComponent as Bahrain } from './circuits/bahrain.svg'
import { ReactComponent as Belgium } from './circuits/belgium.svg'
import { ReactComponent as Brazil } from './circuits/brazil.svg'
import { ReactComponent as Canada } from './circuits/canada.svg'
import { ReactComponent as China } from './circuits/china.svg'
import { ReactComponent as France } from './circuits/france.svg'
import { ReactComponent as Hungary } from './circuits/hungary.svg'
import { ReactComponent as Italy } from './circuits/italy.svg'
import { ReactComponent as Japan } from './circuits/japan.svg'
import { ReactComponent as Mexico } from './circuits/mexico.svg'
import { ReactComponent as Monaco } from './circuits/monaco.svg'
import { ReactComponent as Netherlands } from './circuits/netherlands.svg'
import { ReactComponent as Russia } from './circuits/russia.svg'
import { ReactComponent as Singapore } from './circuits/singapore.svg'
import { ReactComponent as Spain } from './circuits/spain.svg'
import { ReactComponent as Uae } from './circuits/uae.svg'
import { ReactComponent as Uk } from './circuits/uk.svg'
import { ReactComponent as Usa } from './circuits/usa.svg'
import { ReactComponent as Vietnam } from './circuits/vietnam.svg'

interface CircuitIconMap {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export const circuitIconMap: CircuitIconMap = {
    australia: Australia,
    austria: Austria,
    azerbaijan: Azerbaijan,
    bahrain: Bahrain,
    belgium: Belgium,
    brazil: Brazil,
    canada: Canada,
    china: China,
    france: France,
    hungary: Hungary,
    italy: Italy,
    japan: Japan,
    mexico: Mexico,
    monaco: Monaco,
    netherlands: Netherlands,
    russia: Russia,
    singapore: Singapore,
    spain: Spain,
    uae: Uae,
    uk: Uk,
    usa: Usa,
    vietnam: Vietnam
}
