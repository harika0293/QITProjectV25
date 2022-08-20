import React from 'react'
import { StyleSheet,FlatList, TouchableOpacity} from 'react-native'
import { Layout,Text,Icon} from '@ui-kitten/components';
import { LineChart } from "react-native-chart-kit";
import { useLayoutEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import moment from 'moment';

const PatientDetail = ({navigation, route}) => {
  const { patient, text } = route.params;
  useLayoutEffect(() => {
    const unsubscribe = db.collection('usersCollections').doc(patient.index).collection('notes').orderBy("date", "desc").onSnapshot(snapshot =>
      setAnalysis(snapshot.docs.map((doc, index) => ({
        index: index.toString(),
        description: doc.data().description,
        date: moment(doc.data().date).format('LL'),
      })))
    )
    return unsubscribe;
  }, [])
    const [analysis, setAnalysis] = useState([
      {
        index: "1",
        description: "lLorem ipsum dolor sit amet,consectetur adipiscing elit,ua....",
      },
      {
        index: "2",
        description: "lLorem ipsum dolor sit amet,consectetur adipiscing elit,ua....",
      },
      {
        index: "3",
        description: "lLorem ipsum dolor sit amet,consectetur adipiscing elit,ua....",
      },
    ]) 
    return (
        <Layout style={styles.Container}>
        <Layout style={styles.topHead}>
        <Icon
        style={styles.arrow}
        fill="#0075A9"
        name='arrow-back'
        onPress={()=>navigation.navigate('DFilter', {patient:patient})}/>
        <Text style={{fontSize:20,fontFamily:"Recoleta-Bold",marginLeft:10}}>Patient Details</Text>
        </Layout>
        <Text style={{fontSize:15,color:"#DDDDDD",fontFamily:"GTWalsheimPro-Regular",marginLeft:60}}>View your Patient Detail</Text>
        <Layout style={styles.chart}>
       {text}
        </Layout>
        <Layout style={styles.detailAnalysis}>
        <Text style={{fontSize:20,fontFamily:"Recoleta-Bold",marginBottom:30}}>Detailed Analysis</Text>
        {analysis.length === 0 ?<Layout style={{flex:1,alignContent:"center",justifyContent:"center"}}>
      <Text style={{textAlign:"center"}}>No Notes</Text>
    </Layout> :  <FlatList
          style={styles.listStyle}
          keyExtractor={(key) => {
            return key.index;
          }}
          //horizontal
          //inverted
          //showsHorizontalScrollIndicator={true}
          data={analysis}
          renderItem={({ item }) => {
            return (
              <>
                <Layout style={styles.textStyle}>
                  <Text style={{color:"#DADADA",fontFamily:"GTWalsheimPro-Bold"}}>
                    {item.index}. {item.description}
                  </Text>
                </Layout>
              </>
            );
          }}
        />}
       
        </Layout>
        </Layout>
    )
}

export default PatientDetail

const styles = StyleSheet.create({
  
    topHead:{
        display:"flex",
        flexDirection:"row",
        marginTop:20,
        marginHorizontal:20
    },
    arrow:{
        width:30,
        height:30
    },
    chart:{
        marginTop:50,
        marginHorizontal:20
    },
    detailAnalysis:{
        marginTop:40,
        marginHorizontal:30,
    },
    textStyle:{
        backgroundColor:"#F9F9F9",
        padding:10,
        
    }
})
