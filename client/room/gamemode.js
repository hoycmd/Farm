// Импорты:
import * as Basic from 'pixel_combats/basic';
import * as Room from 'pixel_combats/room';

try {
	
// Создаём, команду:
Room.Teams.Add('Blue', '<b><i><size=30><color=#1a9520>F</color><color=#0c9f39>̷</color><color=#188226>Ａ</color><color=#0db900>尺</color><color=#00a81a>爪</color></size></i></b>', new Basic.Color(0, 0.7, 0, 0));
Room.Teams.Get('Blue').ContextedProperties.SkinType.Value = 3;
Room.Teams.Get('Blue').Spawns.SpawnPointsGroups.Add(1);
Room.Teams.Get('Blue').Build.BlocksSet.Value = Room.BuildBlocksSet.Blue;
// Опции:
Room.Ui.GetContext().Hint.Value = 'Farm waiting...';   // Выводим, подсказку.
Room.Damage.GetContext().FriendlyFire.Value = true;  // Урон, по своим.
Room.BreackGraph.PlayerBlockBoost = true;  // Блок игрока, всегда - усилен.
Room.BreackGraph.OnlyPlayerBlocksDmg = true;  // Все, блоки - усилены.
Room.BreackGraph.WeakBlocks = Room.GameMode.Parameters.GetBool('LoosenBlocks');  // Слабые, блоки.
Room.Damage.GetContext().DamageOut.Value = true;  // Урон, в режиме.
Room.Damage.GetContext().GranadeTouchExplosion.Value = true;   // Урон, от - гранат.
 
// ЛидерБорды:
Room.LeaderBoard.PlayerLeaderBoardValues = [
  new Basic.DisplayValueHeader('Kills', '<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>', '<b><size=30><color=#be5f1b>K</color><color=#b65219>i</color><color=#ae4517>l</color><color=#a63815>l</color><color=#9e2b13>s</color></size></b>'),
  new Basic.DisplayValueHeader('Deaths', '<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>', '<b><size=30><color=#be5f1b>D</color><color=#b85519>e</color><color=#b24b17>a</color><color=#ac4115>t</color><color=#a63713>h</color><color=#a02d11>s</color></size></b>'),
  new Basic.DisplayValueHeader('Spawns', '<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>', '<b><size=30><color=#be5f1b>S</color><color=#b85519>p</color><color=#b24b17>a</color><color=#ac4115>w</color><color=#a63713>n</color><color=#a02d11>s</color></size></b>'),
  new Basic.DisplayValueHeader('Scores', '<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>', '<b><size=30><color=#be5f1b>S</color><color=#b85519>c</color><color=#b24b17>o</color><color=#ac4115>r</color><color=#a63713>e</color><color=#a02d11>s</color></size></b>'),
];
// Входы:
 Room.Teams.OnRequestJoinTeam.Add(function(Player, Team) { Team.Add(Player);
});
 Room.Teams.OnPlayerChangeTeam.Add(function(Player) { Player.Spawns.Spawn();
});

// Опрелеляем, вес команды - в лидерБорде:
Room.LeaderBoard.TeamWeightGetter.Set(function(Team) {
	return Team.Properties.Get('Scores').Value;
});
// Определяем, все игрока - в лидерБорде:
Room.LeaderBoard.PlayersWeightGetter.Set(function(Player) {
 return Player.Properties.Get('Scores').Value;
});

// Щит, на 5 секунд:
const ImmortalityTimerName = 'immortality';
Room.Spawns.GetContext().OnSpawn.Add(function(Player){
 Player.Properties.Immortality.Value = true;
Timer = Player.Timers.Get(ImmortalityTimerName).Restart(5);
});
Room.Timers.OnPlayerTimer.Add(function(Timer){
  if (Timer.Id != ImmortalityTimerName) return;
 Timer.Player.Properties.Immortality.Value = false;
});

// Счётчик, спавнов:
Room.Spawns.OnSpawn.Add(function(Player) {
 ++Player.Properties.Spawns.Value;
});

// Счётчик, смертей:
Room.Damage.OnDeath.Add(function(Player) {
 ++Player.Properties.Deaths.Value;
  Player.Spawns.Spawn();
});

// Константы:
const MixModeTime = 2;
const WaitingTime = 2;
const End0fMatchTime = 2;
// Константы, имён:
const Scores_timer_interval = 5;
const WaitingStateValue = 'Maiting';
const MixModeStateValue = 'MixMode';
const EndOfMatchStateValue = 'End0fMatch';
// Переменнные:
const StateProp = Room.Properties.GetContext().Get('State');
const ScoresTimer = Room.Timers.GetContext().Get('Scores');
const MainTimer = Room.Timers.GetContext().Get('Main');
Room.Ui.GetContext().MainTimerId.Value = MainTimer.Id;

//Таймер очков:
ScoresTimer.OnTimer.Add(function () {
 for(const p of Room.Players.All) {
  p.Properties.Scores.Value += 100;
  p.Properties.Kills.Value += 50;
  }
MainTimer.Restart(2);
});

// Переключатели, режимов:
MainTimer.OnTimer.Add(function() {
switch (StateProp.Value) {
case WaitingStateValue:
 SetMixMode();
break;
case MixModeStateValue:
 SetEnd0fMatch();
break;
case EndOfMatchStateValue:
 RestartGame();
break;
          }
});

// Задаём, первое - состояние игры:
SetWaiting();

// Состояние, игры:
function SetWaiting() {
 StateProp.Value = WaitingStateValue;
 MainTimer.Restart(WaitingTime);
 Room.Spawns.GetContext().Enable = false;
}
function SetMixMode() {
 StateProp.Value = MixModeStateValue;
 MainTimer.Restart(MixModeTime);
 Room.Spawns.GetContext().Enable = true;
 SpawnTeams();

 const InventoryContext = Room.Inventory.GetContext();
  InventoryContext.Main.Value = true;
  InventoryContext.Secondary.Value = true;
  InventoryContext.Melee.Value = true;
  InventoryContext.Explosive.Value = true;
  InventoryContext.Build.Value = true;
}
function SetEnd0fMatch() {
 StateProp.Value = EndOfMatchStateValue;
 MainTimer.Restart(End0fMatchTime);
 Room.Game.GameOver(Room.LeaderBoard.GetTeams());

 const SpawnsContext = Room.Spawns.GetContext();
  SpawnsContext.Enable = false;
  SpawnsContext.Despawn();
}
function RestartGame() {
MainTimer.Restart(2);
 if (Room.GameMode.Parameters.GetBool('LoadRandomMap')) {
  Room.Map.LoadRandomMap();
}
  Room.Game.RestartGame();
}

function SpawnTeams() {
 Room.Spawns.GetContext().Spawn();
}

} catch (e) {
        Room.Players.All.forEach(msg => {
                Room.msg.Show(`${e.name}: ${e.message} ${e.stack}`);
        });
}

ScoresTimer.RestartLoop(Scores_timer_interval);
