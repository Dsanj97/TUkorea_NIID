import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import CredentialList from '../assets/img/credential-list.svg'
import ScanShare from '../assets/img/scan-share.svg'
import SecureImage from '../assets/img/secure-image.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { Theme } from '../theme'
import { GenericFn } from '../types/fn'
import { testIdWithKey } from '../utils/testable'

import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (theme: Theme): OnboardingStyleSheet => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
    },
    carouselContainer: {
      flexDirection: 'column',
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
    },
    pagerContainer: {
      flexShrink: 2,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 35,
    },
    pagerDot: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.ColorPallet.brand.primary,
    },
    pagerDotActive: {
      color: theme.ColorPallet.brand.primary,
    },
    pagerDotInactive: {
      color: theme.ColorPallet.brand.secondary,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.ColorPallet.brand.primary,
    },
  })
}
export const createStyle = (theme: Theme) => {
  return StyleSheet.create({
    headerText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.ColorPallet.notification.infoText,
    },
    bodyText: {
      flexShrink: 1,
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.ColorPallet.notification.infoText,
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}
export function createImageDisplayOptions(theme: Theme) {
  return {
    fill: theme.ColorPallet.notification.infoText,
    height: 180,
    width: 180,
  }
}
const customPages = (onTutorialCompleted: GenericFn, theme: Theme) => {
  //const theme = useThemeContext()
  const defaultStyle = createStyle(theme)
  const imageDisplayOptions = createImageDisplayOptions(theme)
  return (
    <>
      <View style={{ alignItems: 'center', backgroundColor: '#ffffff' }}>
        <SecureImage {...imageDisplayOptions} />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, backgroundColor: '#ffffff' }}>
        <Text style={[defaultStyle.headerText, { fontSize: 18 }]}>개인의 정보 보호</Text>
        <Text style={[defaultStyle.bodyText, { marginTop: 20 }]}>개인의 정보를 기기에 보관합니다</Text>
      </View>
      <View style={{ marginTop: 'auto', marginBottom: 20, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
        <Button
          title={'시작하기'}
          accessibilityLabel={'Get Started'}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: string; body: string }> = [
  {
    image: CredentialList,
    title: 'DID 기반 반려동물 등록증 입니다.',
    body: '반려동물의 정보를 저장하고 관리할수 있습니다.',
  },
  {
    image: ScanShare,
    title: 'QR코드를',
    body: 'QR코드를 생성하여 제출할수 있습니다.',
  },
]

const createPageWith = (image: React.FC<SvgProps>, title: string, body: string, theme: Theme) => {
  //const theme = useThemeContext()
  const defaultStyle = createStyle(theme)
  const imageDisplayOptions = createImageDisplayOptions(theme)
  return (
    <>
      <View style={{ alignItems: 'center', backgroundColor: '#ffffff' }}>{image(imageDisplayOptions)}</View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
        <Text style={[defaultStyle.headerText, { fontSize: 18 }]}>{title}</Text>
        <Text style={[defaultStyle.bodyText, { marginTop: 20 }]}>{body}</Text>
      </View>
    </>
  )
}

export const pages = (onTutorialCompleted: GenericFn, theme: Theme): Array<Element> => {
  return [
    ...guides.map((g) => createPageWith(g.image, g.title, g.body, theme)),
    customPages(onTutorialCompleted, theme),
  ]
}
