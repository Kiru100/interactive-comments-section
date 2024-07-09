import { Button } from '@/components/Button';
import { Comment } from '@/components/Comment';
import commentStore from '@/stores/comments';
import userStore from '@/stores/user';

import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';


export default function App() {
	const comments = commentStore((store) => store.comments);
	const addComment = commentStore((store) => store.addComment);
	const current_user = userStore((store) => store.current_user);

	const [focus_text_input, setFocusTextInput] = useState(false);
	const [focus_text_input_value, setFocusTextInputValue] = useState("");

	const onPressSendButton = () =>{
		if(focus_text_input_value?.length){
			addComment(focus_text_input_value, current_user);
			setFocusTextInputValue("");
			setFocusTextInput(false);
		}
	}

	return (
		<View style={styles.container}>
			<FlatList
				ItemSeparatorComponent={() => <View style={{height: 16}} />}
				data={comments}
				renderItem={({item}) => <Comment data={item}/>}
				keyExtractor={comments => comments.id}
			/>
			<View style={styles.add_comment_container}>
				<View
					style={styles.add_comment_input_container}>
					<TextInput
						style={styles.add_comment_input}
						multiline={true}
						numberOfLines={focus_text_input ? 4 : 1}
						placeholder="Add a comment..."
						textAlignVertical={ focus_text_input ? "top" : "center"}
						value={focus_text_input_value}
						onChangeText={text => setFocusTextInputValue(text)}
						onFocus={()=>setFocusTextInput(true)}
						onBlur={()=>setFocusTextInput(false)}
					/> 
				</View>
				<View style={styles.add_comment_actions}>
					<Image
						style={styles.image}
						contentFit="cover"
						transition={1000}
						source={current_user.avatar_url}
					/>
					<Button button_text="Send" onPressButton={onPressSendButton} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 48,
		backgroundColor: '#F5F6FA',
	},
	add_comment_container:{
		backgroundColor: "#fff",
		marginTop: 16,
		padding: 16,
		borderRadius: 8
	},
	image: {
		borderRadius: 50,
		height: 32,
		width: 32,
	},
	add_comment_actions:{
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 16
	},
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
	},
	add_comment_input:{
		fontFamily:"Rubik_400Regular",
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E"
	},
	add_comment_input_container:{
		borderColor: '#E9EBF0',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 24,
		paddingVertical: 12	
	}
	
});