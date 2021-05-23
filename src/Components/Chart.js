import "../index.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(8) + ')';
}

function assign_values(names, values, rgbaCols, quantity, id){
    
    if(names.indexOf("Spitalul cu id-ul: " + id) == -1){
    names.push("Spitalul cu id-ul: " + id);
    values.push(quantity);
    rgbaCols.push(random_rgba());
    } else {
        values[names.indexOf("Spitalul cu id-ul: " + id)] = values[names.indexOf("Spitalul cu id-ul: " + id)] + quantity;
    }

    return true;
}

function increase_chauffeur(chauffeur, requestedChauffeur, rgbaColsChauffeur ,id){

    if(chauffeur.indexOf("Soferul cu id-ul: " + id) == -1){
        chauffeur.push("Soferul cu id-ul: " + id);
        requestedChauffeur.push(1);
        rgbaColsChauffeur.push(random_rgba());
    }
    else{
        requestedChauffeur[chauffeur.indexOf("Soferul cu id-ul: " + id)] = requestedChauffeur[chauffeur.indexOf("Soferul cu id-ul: " + id)] + 1;
    }

    return true;
}


function Chart(){
    const [isLoading, setLoading] = useState(true);
    const [record, setRecord] = useState();

    var names = [];
    var values = [];
    var rgbaCols = [];
    var chauffeur = [];
    var requestedChauffeur = [];
    var rgbaColsChauffeur = [];

    useEffect(() => {
        console.debug("After mount! Let's load data from API...");
        axios.get("https://ip-lab.herokuapp.com/istoric/").then(response => {
          setRecord(response.data);
          setLoading(false);
        });
      }, []);

      if (isLoading) {
        return <div className="chart">Chart is Loading...</div>;
      }

      record.map((recorder) => {
            assign_values(names,values,rgbaCols,recorder.cantitate,recorder.institutie_primitoare)
            increase_chauffeur(chauffeur,requestedChauffeur,rgbaColsChauffeur,recorder.sofer)
        })

        const state1 = {
            chartData:{
                labels: names,
                datasets:[
                  {
                    label:'Quantities requested',
                    data:values,
                    backgroundColor:rgbaCols
                  }
                ]
              }
        }

        const state2 = {
            chartData:{
                labels: chauffeur,
                datasets:[
                  {
                    label:'Requested number of times',
                    data:requestedChauffeur,
                    backgroundColor:rgbaColsChauffeur
                  }
                ]
              }
        }

        return(
            <div className="bothCharts" >
                <div className="chart">
                    <Bar
                        data={state1.chartData}
                        options={{ maintainAspectRatio: false,
                            title:{
                                display: true,
                                text: 'Requested quantities',
                             fontsize: 35
                         }
                     }}
                 />
                </div>
                <div className="chart">
                <Bar
                        data={state2.chartData}
                        options={{ maintainAspectRatio: false,
                            title:{
                                display: true,
                                text: 'Chauffeur',
                             fontsize: 35
                         }
                     }}
                 />
                </div>
            </div>
        )
}

export default Chart;