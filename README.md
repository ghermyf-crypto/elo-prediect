# **ELO PREDICT**


## _What is ELO Predict?_


### ELO Predict is a website that predicts the ELO of a player based on a single game.

## _What is ELO?_


### ELO is a numerical rating system in chess that measures a player's skill level based on their game results against other players.


## _Why ELO Predict?_

### ELO Predict was created because Lichess did not have a function that could predict ELO based on a single chess game. Because of this, we were inspired to create ELO Predict, a website that can estimate the approximate ELO of a player based on a single game.


## _How ELO Predict was Created_

### ELO Predict was created using Google Colab. It is a machine learning model that uses a Gradient Boosting Regressor, which utilizes inaccuracy, mistakes, total number of moves, and the result of the match for most of its features. 


## _Preprocessing The Data_

### For the model to work, we had to preprocess a lot of the dataset since a lot of it was either not useful or not in the correct form. The dataset was from Kaggle's Chess Game Dataset (Lichess) and had a size of 76557 rows. Because we did not want to pay for extra computing units on Colab or upgrade to Colab Pro, we had to size down the dataset to 4% of the original size. We only chose 3 columns: `Moves`, `TotalMoves`, and `Result` for further processing. `Moves` is then further processed into `evals`. `evals` then gets further processed into two columns: `whitediff` and `blackdiff`, which contain the eval differences for white and black. `Whitediff` and `blackdiff` then get used to create four columns for inaccuracy and mistakes. `Inaccuracy` is if the difference of the evals is in a range of 0.5 to 1. `Mistake` is if the difference of the evals is in a range of 1 to 2.5. The calculated `Whiteinac`, `Blackinac`, `Whitemistake`, and `Blackmistake` are combined with the `TotalMoves` and `Result` Columns. The `Result` column is then one-hot encoded to produce two separate Boolean features, `Result_1/2-1/2` and `Result_1-0`. A new feature, `MoveRatio`, is created, representing the sum of inaccuracies and mistakes divided by the total number of moves, which provides a normalized measure of move quality. The target variable, y (ELO Rating), is created using the original `df.SizeDown`.

## _Training The Model_
### 


## _Visit The Site Here:_
http://ghermyf-crypto.github.io/elo-prediect/
