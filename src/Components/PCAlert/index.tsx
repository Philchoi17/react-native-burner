import * as React from 'react'
import { Overlay, OverlayProps, Div, Button } from 'react-native-magnus'

import { PCText, PCButton } from '@/Components'

interface Props extends OverlayProps {
  visible: boolean
  alertMsg: string
  alertTitle?: string
  actionButtons?: boolean
  withInput?: boolean
  inputActions?: JSX.Element
  confirmAction?: () => void
  cancelAction?: () => void
}

export default function PCAlert({
  visible,
  alertMsg,
  alertTitle,
  actionButtons,
  confirmAction = () => {},
  cancelAction = () => {},
  withInput,
  inputActions,
}: Props) {
  // const [alert, setAlert] = useState<boolean>(false)
  // const useAlertTimeout = () => {
  //   if (!actionButtons) {
  //     // setAlert(true)
  //     setTimeout(() => {
  //       setAlert(false)
  //     }, 2000)
  //   }
  // }

  // useEffect(useAlertTimeout, [])
  return (
    <Overlay visible={visible} p="xl">
      {alertTitle && (
        <PCText size="2xl" fontWeight="700" textAlign="center">
          {alertTitle}
        </PCText>
      )}
      <PCText p="lg" size="lg">
        {alertMsg}
      </PCText>
      {withInput && inputActions}
      {actionButtons && (
        <Div p="md" row justifyContent="center">
          <PCButton mx="sm" onPress={confirmAction} w={100}>
            Confirm
          </PCButton>
          <PCButton mx="sm" onPress={cancelAction} w={100}>
            Cancel
          </PCButton>
        </Div>
      )}
    </Overlay>
  )
}
