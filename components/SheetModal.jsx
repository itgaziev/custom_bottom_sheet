import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native'

const { width, height } = Dimensions.get('screen')

class SheetModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            drag : false,
            value : 0,
            aligment: new Animated.Value(0),
            style: { bottom: -height },
            size : height
        }

        if(this.props.maxSize !== undefined) this.state.size = this.props.maxSize

        console.log(this.props.maxSize)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.openSheet !== this.props.openSheet) {
            let val = 0;
            let styleInterpalate = this.state.aligment.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0]
            }) 

            if(this.state.value === 0) {
                val = 1;
            }
            else 
            {
                val = 0;
            }
            this.setState({
                style : { bottom : styleInterpalate }, 
                value : 0
            })
            Animated.timing(this.state.aligment, {
                toValue: val,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }

    onScroll(e) {
        if(this.state.drag) {
            let val = 0;
            if(e.nativeEvent.contentOffset.y > 0) {
                val = this.state.value + 0.1;
                if(val > 0.8) val = 1;
            }
            else
            {
                val = this.state.value - 0.1;
                if(val < 0.2) val = 0;
            }
            this.setState({value : val})

            let actionSheetIntropolate = this.state.aligment.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0]
            })

            this.setState({style : { bottom : actionSheetIntropolate }})

            this.dragSheedGrabber()
        }
    }

    onScrollBeginDrag() {
        this.setState({ drag: true })
    }

    onScrollEndDrag() {
        this.setState({ drag: false })
    }

    dragSheedGrabber() {
        Animated.timing(this.state.aligment, {
            toValue: this.state.value,
            duration: 500,
            useNativeDriver: false
        }).start();
    }


    render() {
        return (
            <Animated.View style={[styles.container, this.state.style, { height : this.state.size }]}>
                <ScrollView 
                    style={styles.grabber}
                    scrollEventThrottle={16}
                    onScroll={(e) => this.onScroll(e)}
                    onScrollBeginDrag={ () => this.onScrollBeginDrag() }
                    onScrollEndDrag={ () => this.onScrollEndDrag() }
                />
                <View style={styles.contentModal}>
                    { this.props.children }
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width,
    },
    grabber: {
        maxHeight: 55,
        alignSelf: 'center',
        width: 65,
        borderBottomWidth: 6,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        marginBottom: 10
    },
    contentModal: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderWidth: 1
    }
})

export default SheetModal