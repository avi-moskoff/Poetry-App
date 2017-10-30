import IProps from './IProps'

interface INavigation {
    navigate: (screen: string, props?: any) => void,
    setParams: (text: any) => void,
    state: {
        key: string,
        params: {
            poem: string
        }
    }
}

export default INavigation
