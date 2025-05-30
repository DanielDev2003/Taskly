import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from '../screens/theme'
import Tasks from '../screens/tasks'
import Projects from '../screens/projects';
import {Ionicons} from '@expo/vector-icons'
import Users from '../screens/users';

const Tab = createBottomTabNavigator();
export function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="theme"
                component={Theme}
                options={{
                    tabBarShowLabel:false,
                    headerShown:false,
                    tabBarIcon: ({focused, size, color}) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name='home'/>
                        }return <Ionicons size={size} color={color} name='home-outline'/>
                    }
                }}
            />

            <Tab.Screen
                name="tasks"
                component={Tasks}
                options={{
                    tabBarShowLabel:false,
                    headerShown:false,
                    tabBarIcon: ({focused, size, color}) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name='clipboard'/>
                        }return <Ionicons size={size} color={color} name='clipboard-outline'/>
                    }
                }}
            />
            <Tab.Screen
                name="project"
                component={Projects}
                options={{
                    tabBarShowLabel:false,
                    headerShown:false,
                    tabBarIcon: ({focused, size, color}) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name='home'/>
                        }return <Ionicons size={size} color={color} name='home-outline'/>
                    }
                }}
            />
            <Tab.Screen
                name="usuarios"
                component={Users}
                options={{
                    tabBarShowLabel:false,
                    headerShown:false,
                    tabBarIcon: ({focused, size, color}) => {
                        if(focused){
                            return <Ionicons size={size} color={color} name='home'/>
                        }return <Ionicons size={size} color={color} name='home-outline'/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}