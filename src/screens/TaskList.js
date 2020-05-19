//#region Import Node Modules
import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native'
//#endregion

//#region Import de arquivos que foram criados
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'

//#endregion
//#region importar datas
import moment from 'moment'
import 'moment/locale/pt-br'
//#endregion

export default class TaskList extends Component{
    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar livro react native',
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(),
            desc: 'Comprar livro react native',
            estimateAt: new Date(),
            doneAt: null
        }]
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style = {styles.background}>   
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>                 
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks}
                        keyExtractor = {item => `${item.id}`} 
                        renderItem={ ( { item } ) => <Task {...item}/>}/>

                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    background:{
        flex: 3
    },
    taskList:{
        flex:7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
})
