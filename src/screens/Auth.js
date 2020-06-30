import React,{Component} from 'react'
import {
    ImageBackground, 
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from 'react-native'
import backGroudImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
import {server, showError, showSuccess} from '../common'
import axios from 'axios'
const initialState = {
    name:'',
    email:'',
    password:'',
    confimePassword:'',
    stageNew: false
}
export default class Auth extends Component{
    state = {
        ...initialState
    }

    signinOrSignup = () =>{
        if(this.state.stageNew){
            this.signup()
        }else{
            this.signin()
        }
    }
    signup = async () => {
        try {
            const state = this.state
            await axios.post(`${server}/signup`,{
                name: state.name,
                email:state.email,
                password:state.password,
                confimePassword: state.confimePassword,
            })
            showSuccess('Usuário cadastrado')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }
    signin = async () =>{
        const state = this.state
        try {
            const res = await axios.post(`${server}/signin`,{
                email: state.email,
                password: state.password,
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }
    render(){
        return(
            <ImageBackground source={backGroudImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        style={styles.input}/>
                    }
                    <AuthInput icon='at' placeholder='E-mail' value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    style={styles.input}/>
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    style={styles.input} secureTextEntry={true}/>
                    {this.state.stageNew &&
                        <AuthInput icon='lock' placeholder='Confirmar senha' value={this.state.confimePassword}
                        onChangeText={confimePassword => this.setState({confimePassword})}
                        style={styles.input} secureTextEntry={true}/>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {{ paddig: 10 }}
                    onPress={
                        () => this.setState({ stageNew: !this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width:'90%'
    },
    input:{
        marginTop: 10,
        backgroundColor:'#fff',
    },
    button:{
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText:{
        fontSize: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})