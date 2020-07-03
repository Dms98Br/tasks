import React from 'react'
import { Plataform, ScrollView, View, Text, StyleSheet, Platform } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'
export default props =>{
    const optionsGravatar = {
        email: props.navigation.getParam('email'),
        secure: true
    }
    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
            <Gravatar style={styles.avatar}
                options={optionsGravatar}/>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
                <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
            </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}
const styles =StyleSheet.create({
    header:{
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title:{
        color:'#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,        
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 50 : 10
    },  
    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },
    userInfo:{
        marginLeft: 10,
    },
    name:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 10,
        color: commonStyles.colors.mainText,
        marginBottom: 5
    },
    email:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 5
    }
})