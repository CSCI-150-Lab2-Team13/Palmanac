/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import { StackNavigator } from "react-navigation";
import App from './App';
import {name as appName} from './app.json';
import 'babel-polyfill';







AppRegistry.registerComponent(appName, () => App);
