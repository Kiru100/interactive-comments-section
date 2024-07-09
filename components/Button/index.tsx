import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props{
	button_text: string;
	onPressButton: ()=> void
}

export const Button = ({button_text, onPressButton}: Props) => {
	return (
		<TouchableOpacity style={styles.add_comment_button} onPress={onPressButton}>
			<Text style={styles.add_comment_button_label}>{button_text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	add_comment_button:{
		backgroundColor: "#5357B6",
		borderRadius: 8,
		width: 104,
		height: 48,
		justifyContent: "center",
		alignItems: "center"
	},
	add_comment_button_label:{
		fontSize: 16,
		fontFamily:"Rubik_500Medium",
		color: "#fff"
	}
});