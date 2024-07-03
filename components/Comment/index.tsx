import { CommentInterface } from '@/constants/interfaces';
import { Image } from 'expo-image';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Comment = ({data: {content, upvotes, user_profile, date}} : {data: CommentInterface}) => {
    
    const formatDate = (date: string) => {
        return moment(date).fromNow();
    };
    
    return (
        <View style={styles.comment}>
            <View style={styles.comment_details}>
                <Image
                    style={styles.image}
                    source={user_profile.avatar_url}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.user_name}>
                    {user_profile.username}
                </Text>
                <Text style={styles.comment_date}>
                    {formatDate(date)}
                </Text>
            </View>
            <Text  style={styles.comment_content}>
                {content}
            </Text>
            <View style={styles.comment_actions}>
                <View style={styles.up_down_vote_container}>
                    <TouchableOpacity>
                        <Image 
                            style={styles.up_vote_icon}
                            contentFit="cover"
                            source={require("../../assets/images/+.png")} 
                        />
                    </TouchableOpacity>
                    <Text style={styles.up_down_vote_count}>{upvotes}</Text>
                    <TouchableOpacity>
                        <Image 
                            style={styles.down_vote_icon}
                            contentFit="cover"
                            source={require("../../assets/images/-.png")}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.reply_button}>
                    <Image 
                        style={styles.reply_icon}
                        contentFit="cover"
                        source={require("../../assets/images/reply.png")}
                    />
                    <Text style={styles.reply_label}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	comment_date:{
		color: "#67727E", 
		fontSize: 16,
		lineHeight: 24,
		fontFamily:"Rubik_400Regular"
	},
	user_name:{
		color: "#334253",
		fontSize: 16,
		fontFamily:"Rubik_500Medium"
	},
	image: {
		borderRadius: 50,
		height: 32,
		width: 32,
		backgroundColor: '#0553',
	},
	comment:{
		width: '100%',
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8
	},
	comment_details:{
		width: '100%',
		gap: 16,
		flexDirection:"row",
		alignItems:"center"
	},
	comment_content:{
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	comment_actions:{
		flexDirection:"row",
		alignContent: "center",
		overflow: "hidden",
		marginTop: 16,
		justifyContent: "space-between"
	},
	up_down_vote_container: {
		flexDirection:"row",
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F6FA",
		borderRadius: 10,
		alignItems: "center",
        gap: 8
	},
	up_down_vote_count:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		width: 30,
		textAlign: "center",
		color: "#5357B6",
	},
	up_vote_icon: {
		height: 10,
		width: 10,
	},
	down_vote_icon: {
		height: 2.5,
		width: 10,
	},
	reply_button:{
		flexDirection:"row",
		alignItems: "center",
	},
	reply_icon:{
		height: 12.25,
		width: 14,
	},
	reply_label:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		color:"#5357B6",
		marginLeft: 8
	}
	
});
