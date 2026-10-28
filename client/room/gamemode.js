
import * as b from 'pixel_combats/basic'; import * as r from 'pixel_combats/room';try{	
r.Teams.Add(`f`, `<b><i><size=30><color=#1a9520>F</color><color=#0c9f39>̷</color><color=#188226>Ａ</color><color=#0db900>尺</color><color=#00a81a>爪</color></size></i></b>`,new b.Color(0, 0.7, 0, 0));
r.Teams.Get(`f`).ContextedProperties.SkinType.Value=3;
r.Teams.Get(`f`).Spawns.SpawnPointsGroups.Add(1);
r.Teams.Get(`f`).Build.BlocksSet.Value=r.BuildBlocksSet.Blue;	
r.Ui.GetContext().Hint.Value=`/≪<b>Farm waiting...≫</b>`; 
r.Damage.GetContext().FriendlyFire.Value=true; 
r.BreackGraph.PlayerBlockBoost=true;  
r.BreackGraph.OnlyPlayerBlocksDmg=true;  
r.BreackGraph.WeakBlocks=r.GameMode.Parameters.GetBool(`LoosenBlocks`);  
r.Damage.GetContext().DamageOut.Value=true;  
r.Damage.GetContext().GranadeTouchExplosion.Value=true;   
r.LeaderBoard.PlayerLeaderBoardValues=[new b.DisplayValueHeader(`k`,`<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>`,`<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>`),new b.DisplayValueHeader(`d`,`<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>`,`<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>`),new b.DisplayValueHeader(`ś`,`<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>`,`<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>`),new b.DisplayValueHeader(`s`, `<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>`, `<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>`)];
r.Teams.OnRequestJoinTeam.Add(function(p,t){t.Add(p)}),r.Teams.OnPlayerChangeTeam.Add(function(p){p.Spawns.Spawn()});
r.LeaderBoard.TeamWeightGetter.Set(function(t){return t.Properties.Get(`s`).Value});	
r.LeaderBoard.PlayersWeightGetter.Set(function(p){return p.Properties.Get(`s`).Value});
r.Spawns.OnSpawn.Add(function(p){p.Properties.Spawns.Value++});
r.Damage.OnDeath.Add(function(p){p.Properties.Deaths.Value++;p.Spawns.Spawn()});
r.Spawns.GetContext().OnSpawn.Add(function(p){
t=p.Timers.Get(`immortality`).Restart(5);
p.Properties.Immortality.Value=true});
r.Timers.OnPlayerTimer.Add(function(t){
if (t.Id != `immortality`)t.Player.Properties.Immortality.Value = false});
r.Ui.GetContext().MainTimerId.Value=r.Timers.GetContext().Get(`Main`).id;
r.Timers.GetContext().Get(`s`).OnTimer.Add(function(){
r.Timers.GetContext().Get(`m`).Restart(5)});
for(var p of r.Players.All){p.Properties.Scores.Value += 50,p.Properties.Kills.Value += 1, p.Properties.Deaths.Value += 1};
r.Timers.GetContext().Get(`m`).OnTimer.Add(function(){
switch(r.Properties.GetContext().Get(`p`).Value){
 case WaitingStateValue:f2()break;
 case MixModeStateValue:f3()break;
 case EndOfMatchStateValue:f4()break}})f1();
 function f1(){r.Properties.GetContext().Get(`p`).Value=`f1`,r.Timers.GetContext().Get(`m`).Restart(3),r.Spawns.GetContext().Enable=false};
 function f2(){r.Properties.GetContext().Get(`p`).Value=`f2`,r.Timers.GetContext().Get(`m`).Restart(5),r.Spawns.GetContext().Enable=true,r.Spawns.GetContext().Spawn(),r.Teams.Get(`f`).Inventory.Main.Value=true,r.Teams.Get(`f`).Inventory.Secondary.Value=true,r.Teams.Get(`f`).Inventory.Melee.Value=true,r.Teams.Get(`f`).Inventory.Explosive.Value=true,r.Teams.Get(`f`).Inventory.Build.Value=true};
 function f3(){r.Properties.GetContext().Get(`p`).Value=`f3`,r.Timers.GetContext().Get(`m`).Restart(3),r.Game.GameOver(r.LeaderBoard.GetTeams()),r.Spawns.GetContext().Enable=false,r.Spawns.GetContext().Despawn()};
 function f4(){r.Timers.GetContext().Get(`m`).Restart(2),r.Game.RestartGame(),if(r.GameMode.Parameters.GetBool(`LoadRandomMap`))room.Map.LoadRandomMap()};
r.Timers.GetContext(`s`).RestartLoop(3);
}catch(e){r.Players.All.forEach(p=>{p.PopUp(`${e.name}: ${e.message} ${e.stack}`)})};
