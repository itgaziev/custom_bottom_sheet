import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import SheetModal from './components/SheetModal';

const { width, height } = Dimensions.get('screen')

const Content = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDropSheet = () => {
        if(isOpen) setIsOpen(false)
        else setIsOpen(true)
    }

    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <TouchableOpacity onPress={ () => handleDropSheet() } style={{ marginTop: 15, backgroundColor: 'blue', paddingHorizontal: 25, paddingVertical: 15}}>
              <Text style={{ color: 'white' }}>Open Sheet</Text>
          </TouchableOpacity>
          <SheetModal openSheet={isOpen} maxSize={ height / 1.2 }>
              <View style={{ flex: 1 }}>
                  <Text>New Content</Text>
              </View>
          </SheetModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default Content